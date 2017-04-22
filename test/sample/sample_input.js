var user = {
  name: 'jon',
  followerCount: 5,
  followers: [{ name: 'zivi' }]
};
var emptyUser = {};
var users = [user];
var emptyUsers = [];
user.followerCount = 6;
user.followerCount++;
user.followerCount += 1;
resetfollowerCount(user); // should no-op thanks to elsa

function resetfollowerCount(user) {
  person.followerCount = 1;
}
