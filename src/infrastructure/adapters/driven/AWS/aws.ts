import AWS from 'aws-sdk';
import path from 'path';
AWS.config.loadFromPath(path.resolve(__dirname, '../../../../../aws-config.json'));
export default AWS;
