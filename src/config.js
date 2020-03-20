
export const API_URL = 'http://localhost:8080/api/1.0';
// const API_URL = 'http://HoaxifyApp-env.eq9spv9gbn.eu-west-3.elasticbeanstalk.com/api/1.0';

export const IMAGES_ATTACHMENTS = 'http://localhost:8080/images/attachments';
// const IMAGES_ATTACHMENTS = 'http://HoaxifyApp-env.eq9spv9gbn.eu-west-3.elasticbeanstalk.com/images/attachments';

export const IMAGES_PROFILE = 'http://localhost:8080/images/profile';
// const IMAGES_PROFILE = 'http://HoaxifyApp-env.eq9spv9gbn.eu-west-3.elasticbeanstalk.com/images/profile';

export const ACCESS_TOKEN = 'accessToken';

export const OAUTH2_REDIRECT_URI = 'http://localhost:3000/oauth2/redirect'
// export const OAUTH2_REDIRECT_URI = 'http://HoaxifyApp-env.eq9spv9gbn.eu-west-3.elasticbeanstalk.com/oauth2/redirect'

export const GOOGLE_AUTH_URL = API_URL + '/oauth2/authorize/google?redirect_uri=' + OAUTH2_REDIRECT_URI;
export const FACEBOOK_AUTH_URL = API_URL + '/oauth2/authorize/facebook?redirect_uri=' + OAUTH2_REDIRECT_URI;
export const GITHUB_AUTH_URL = API_URL + '/oauth2/authorize/github?redirect_uri=' + OAUTH2_REDIRECT_URI;
