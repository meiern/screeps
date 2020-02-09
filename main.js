////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////// MEIERN SCREEPS /////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////// roles /////////////////////////////////////////
let roleHarvester = require('role.harvester');
let roleUpgrader = require('role.upgrader');
let roleBuilder = require('role.builder');

////////////////////////////////////// functions ///////////////////////////////////////
let fncSpawn = require('function.spawning');
let fncCrtCreepDef = require('function.createCreepDefinition');

module.exports.loop = function () {
////////////////////////////////////// variables ///////////////////////////////////////
    let ll_spawns = []; // List of spawns
    let ll_creeps = {}; // List of creeps per role
    let ll_creepDefinitions = []; // List of creep definitions
    const llc_roles = ['harvester', 'upgrader', 'builder']; // List of available roles

///////////////////////////////////// clear Memory /////////////////////////////////////
    for (let lv_creepCount in Memory.creeps) {
        if (!Game.creeps[lv_creepCount]) {
            delete Memory.creeps[lv_creepCount];
        }
    }

/////////////////////////////////// list definitions ///////////////////////////////////
    // List of spawns
    for (let lv_name in Game.spawns) {
        if (Game.spawns.hasOwnProperty(lv_name)) {
            ll_spawns.push(Game.spawns[lv_name]);
        }
    }

    // List of creeps by role
    llc_roles.forEach(role => ll_creeps[role] = _.filter(
        Game.creeps, {
            memory: {role: role}
        })
    );

/////////////////////////////// create creep definitions ///////////////////////////////
    // Harvester
    ll_creepDefinitions.push(fncCrtCreepDef._create(llc_roles[0], 0, 2));
    // Upgrader
    ll_creepDefinitions.push(fncCrtCreepDef._create(llc_roles[1], 1, 4));
    // Builder
    ll_creepDefinitions.push(fncCrtCreepDef._create(llc_roles[2], 2, 2));

/////////////////////////////////// spawning creeps ////////////////////////////////////
    // Spawn creeps by role, prio ascending
    let lv_spawning = false;
    for (let lv_prio = 0; lv_prio < llc_roles.length; lv_prio++) {
        let lv_creep = null;
        lv_creep = ll_creepDefinitions.find(element => element.prio === lv_prio);

        if (typeof lv_creep != null) {
            if (ll_creeps[lv_creep.role].length < lv_creep.amount) {
                if (!lv_spawning) {
                    fncSpawn._spawn(ll_spawns[0], lv_creep, ll_creeps);
                    lv_spawning = true;
                }
            }
        }
    }

///////////////////////////////// creep work progress //////////////////////////////////
    for (let lv_name in Game.creeps) {
        if (Game.creeps.hasOwnProperty(lv_name)) {
            let lv_creep = Game.creeps[lv_name];
            if (lv_creep.memory.role === 'harvester') {
                // If all spawns full then build stuff
                let lv_resourceFull = false;

                for (let i = 0; i <= ll_spawns.length - 1; i++) {
                    if (ll_spawns[i].store.getFreeCapacity(RESOURCE_ENERGY) === 0){
                        lv_resourceFull = true;
                    }
                }

                if(lv_resourceFull){
                    roleBuilder.run(lv_creep);
                }else{
                    roleHarvester.run(lv_creep);
                }
            }
            if (lv_creep.memory.role === 'upgrader') {
                roleUpgrader.run(lv_creep);
            }
            if (lv_creep.memory.role === 'builder') {
                roleBuilder.run(lv_creep);
            }
        }
    }
};