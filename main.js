////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////// MEIERN SCREEPS /////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////// roles /////////////////////////////////////////
let roleHarvester = require('role.harvester');
let roleUpgrader = require('role.upgrader');

////////////////////////////////////// functions ///////////////////////////////////////
let fncSpawn = require('function.spawning');
let fncCrtCreepDef = require('function.createCreepDefinition');

module.exports.loop = function () {
////////////////////////////////////// variables ///////////////////////////////////////
    let ll_spawns = [];
    let ll_creeps = {};
    let ll_creepDefinitions = [];
    const ll_roles = ['harvester', 'upgrader'];

    ll_creepDefinitions.push(fncCrtCreepDef._create(ll_roles[0], 1, 3));
    ll_creepDefinitions.push(fncCrtCreepDef._create(ll_roles[1], 2, 3));

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
    ll_roles.forEach(role => ll_creeps[role] = _.filter(
        Game.creeps, {
            memory: { role: role }
        })
    );

/////////////////////////////////// spawning creeps ////////////////////////////////////
    for(let prio = 0; prio <= ll_roles.length; prio++){
        ll_creepDefinitions.forEach(
            creep => {
                if(creep.prio === prio && ll_creeps[creep.role].length < ll_creepDefinitions.find(
                    element => element.role === creep.role).amount){
                    fncSpawn._spawn(ll_spawns[0], creep.role, ll_creeps);
                }
            }
        );
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