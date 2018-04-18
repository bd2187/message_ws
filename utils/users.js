const Users = {
    usersArr: [],

    addUser: function(user) {
        this.usersArr.push(user);
        console.log(this.usersArr);
    },

    removeUser: function(user) {
        return this.usersArr.filter(function(item) {
            return item !== user;
        });
    },

    findUser: function(user) {
        var user = this.usersArr.find(function(item) {
            return item.username === user.username;
        });

        return user;
    },

    getUsers: function() {
        return this.usersArr.map(function(item) {
            return item.username;
        });
    }
}

module.exports = Users