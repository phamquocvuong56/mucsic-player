import React from 'react';
import Icon from '@ant-design/icons';

export default function wrapIcon(SVG) {
	return ({ ...props }) => <Icon {...props} component={SVG} />;
}
