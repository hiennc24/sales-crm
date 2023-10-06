import { call, put, takeEvery } from '@redux-saga/core/effects';
import { uploadFileSuccessAction, UPLOAD_FILE } from './upload.action';
import API from '../../services/api';

function* uploadFileSaga({ payload }) {
	try {
		const response = yield call(
			API.uploadFile.uploadFile,
			payload.data,
			payload.type
		);
		yield call(API.user.saveUserImage, {
			code: payload.type === 'image' ? response.imageId : response.docsId,
			type: payload.type === 'image' ? 1 : 3,
			name: payload.data.get('files').name,
		});
		yield put(
			uploadFileSuccessAction({
				Files: payload.type === 'image' ? response.imageId : response.docsId,
				Type: payload.type === 'image' ? 1 : 3,
				Name: payload.data.get('files').name,
			})
		);
	} catch (error) {
		console.log(error);
	}
}

export default function* agentUploadFile() {
	yield takeEvery(UPLOAD_FILE, uploadFileSaga);
}
