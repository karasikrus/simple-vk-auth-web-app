const passportConfig = {
    clientID: '7315956', // VK.com docs call it 'API ID', 'app_id', 'api_id', 'client_id' or 'apiId'
    clientSecret: '7fYF19XiTs4oGoCd1xCv',
    callbackURL: "/vkcallback",
    apiVersion: '5.103',
    profileFields: ['photo_100'],
    display: 'popup',
    scope: ['friends'],
    failureRedirect: '/login'
}
module.exports = passportConfig;
