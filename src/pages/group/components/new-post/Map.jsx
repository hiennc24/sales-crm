/* eslint-disable react/prop-types */
import React, { memo } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';

const GGMap = ({ lat, lng }) => {
	return (
		<GoogleMap
			mapContainerStyle={{
				width: '100%',
				height: '250px'
			}}
			center={{ lat, lng }}
			zoom={17}>
			<Marker position={{ lat: lat ? lat : 21.02, lng: lng ? lng : 105.83 }} />
		</GoogleMap>
	)
};

export default memo(GGMap);
