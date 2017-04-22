var user = {
  name: 'jon',
  followerCount: 5,
  followers: [{ name: 'zivi' }]
};
var defaultEmptyUser = user || {};
var users = [user];
var emptyUsers = [];
user.followerCount = 6;
user.followerCount++;
user.followerCount += 1;
resetfollowerCount(user, {});

function resetfollowerCount(user) {
  person.followerCount = 1;
}
