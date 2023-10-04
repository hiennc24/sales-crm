import httpStatus from "http-status";
import { addDataToBody } from "../middlewares/addUserToBody";
import { PhaseModel } from "../models/phase.model";
import { paginate } from "../models/plugins";
import { IPhaseDoc } from "../types";
import ApiError from "../utils/ApiError";

const createPhase = async (body: any): Promise<IPhaseDoc | null> => {
  return PhaseModel.create(body);
};

const getPhase = async (phaseId: string): Promise<IPhaseDoc | null> => {
  const phase = PhaseModel.findOne({
    _id: phaseId,
    deletedById: { $exists: false }
  })

  if(!phase) {
    throw new ApiError(httpStatus.NOT_FOUND, "phase not found");
  }

  return phase;
}

const getPhases = async (projectId: string): Promise<IPhaseDoc[]> => {
  const phases = PhaseModel.paginate({ projectId });

  return phases;
}

const updatePhase = async (entityId: string, body: any): Promise<IPhaseDoc> => {
  let phase = await PhaseModel.findById(entityId);
  if (!phase) {
    throw new ApiError(httpStatus.NOT_FOUND, "phase not found");
  }

  Object.keys(body).forEach(key => {
    phase[key] = body[key];
  })

  return phase.save();
};

const deletePhase = async (phaseId: string, body: any): Promise<IPhaseDoc> => {
  const phase = await PhaseModel.findOneAndUpdate(
    {
      _id: phaseId,
      deletedById: { $exists: false }
    }, 
    {
      ...body,
      deletedAt: new Date(),
    },
    {
      new: true,
    }
  )

  if(!phase) {
    throw new ApiError(httpStatus.NOT_FOUND, "phase not found");
  }

  return phase;
}

export const phaseService = {
  createPhase,
  updatePhase,
  getPhase,
  getPhases,
  deletePhase,
}
