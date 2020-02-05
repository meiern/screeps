////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////// MEIERN SCREEPS /////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////// roles /////////////////////////////////////////
let roleHarvester = require('role.harvester');
let roleUpgrader = require('role.upgrader');

////////////////////////////////////// functions ///////////////////////////////////////
let fncSpawn = require('function.spawning');

module.exports.loop = function () {
////////////////////////////////////// variables ///////////////////////////////////////
    let ll_spawns = [];
    let ll_creeps = {};
    const ll_roles = ['harvester', 'upgrader'];
    const numOfHarvesters = 3;
    const numOfUpgraders = 3;

    ll_roles.forEach(role => ll_creeps[role] = []);

///////////////////////////////////// clear Memory /////////////////////////////////////
    for(let i in Memory.creeps) {
        if(!Game.creeps[i]) {
            delete Memory.creeps[i];
        }
    }

/////////////////////////////////// list definitions ///////////////////////////////////
    // List of spawns
    for(let name in Game.spawns) {
        if (Game.spawns.hasOwnProperty(name)) {
            ll_spawns.push(Game.spawns[name]);
        }
    }

    // List of creeps by role
    ll_roles.forEach(role => ll_creeps[role] = _.filter(Game.creeps, {memory: { role: role }}) );

/////////////////////////////////// spawning creeps ////////////////////////////////////
    if(ll_creeps['harvester'].length < numOfHarvesters){
        fncSpawn._spawn(ll_spawns[0], 'harvester', ll_creeps);
    }

    if(ll_creeps['upgrader'].length < numOfUpgraders){
        fncSpawn._spawn(ll_spawns[0], 'upgrader', ll_creeps);
    }

///////////////////////////////// creep work progress //////////////////////////////////
    for(let name in Game.creeps) {
        if (Game.creeps.hasOwnProperty(name)) {
            let creep = Game.creeps[name];
            if (creep.memory.role === 'harvester') {
                roleHarvester.run(creep);
            }
            if (creep.memory.role === 'upgrader') {
                roleUpgrader.run(creep);
            }
        }
    }
};