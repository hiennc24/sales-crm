import { FieldModel } from './../models/fields.models';
import { getFieldHelper } from './../helpers/ProjectFieldHelper';
import { TABLE_PROJECT } from './../config/tablename';
import { FILED_KEY_ARR_SYSTEM, KEY_SYSTEM } from './../types/fieldTypes';

export const createFieldSystem = async (projectId: string, userId: string) => {
  await Promise.all(
    FILED_KEY_ARR_SYSTEM.map((field) => {
      const body = {
        entityId: projectId,
        onModel: TABLE_PROJECT,
        fieldKey: field,
        fieldName: field.charAt(0).toUpperCase() + field.slice(1),
        fieldType: KEY_SYSTEM[field],
        createdById: userId,
        isFieldSystem: true,
      };

      const fieldConfigs = getFieldHelper({
        fieldKey: field,
        fieldName: field.charAt(0).toUpperCase() + field.slice(1),
        fieldType:  KEY_SYSTEM[field],
      }, 1);

      return FieldModel.create({
        ...body,
        ...fieldConfigs.toJson(),
      });
    })
  );
}