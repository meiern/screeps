////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////// MEIERN SCREEPS /////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////

// TODO: Create classes for each entity of the project
// TODO: resource management for creeps (Currently all creeps go for the closest resource)

// INFO:    The creep definitions carry the info which resource should be targeted to prevent
//          creeps from stacking at resource points

//////////////////////////////////////// roles /////////////////////////////////////////
let roleHarvester = require('role.harvester');
let roleUpgrader = require('role.upgrader');
let roleBuilder = require('role.builder');

////////////////////////////////////// functions ///////////////////////////////////////
let fncSpawn = require('function.spawning');
let fncCrtCreepDef = require('function.createCreepDefinition');

//////////////////////////////////////// core //////////////////////////////////////////
let coreCheck = require('core.check');

module.exports.loop = function () {
////////////////////////////////////// variables ///////////////////////////////////////
    let ll_spawns = []; // List of spawns
    let ll_creeps = {}; // List of creeps per role
    let ll_creepDefinitions = []; // List of creep definitions
    const llc_roles = {
        HARVESTER: 'harvester',
        UPGRADER: 'upgrader',
        BUILDER: 'builder'}; // List of available roles

///////////////////////////////////// clear Memory /////////////////////////////////////
    // No inspection because nonexistent elements are selected to be deleted
    for (let lv_creepCount in Memory.creeps) {
        // noinspection JSUnfilteredForInLoop
        if (!Game.creeps[lv_creepCount]) {
            // noinspection JSUnfilteredForInLoop
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
    for (let role in llc_roles) {
        ll_creeps[llc_roles[role]] = _.filter(
            Game.creeps, {
                memory: {role: llc_roles[role]}
            });
    }

/////////////////////////////// create creep definitions ///////////////////////////////
    // TODO: Add more roles according to resource management
    // TODO: Initialize creep definitions according to roles (Dont use same prio twice)
    // TODO: Add secondary roles to Creep definitions
    // TODO: Add more roles for Structures, containers, walls
    // TODO:: Before setting the resource id we first need to check how many resources are available
    // Harvester close
    ll_creepDefinitions.push(fncCrtCreepDef._create(llc_roles.HARVESTER, llc_roles.BUILDER,0, 2, [WORK, CARRY, MOVE], 0));
    // Harvester far
    ll_creepDefinitions.push(fncCrtCreepDef._create(llc_roles.HARVESTER, llc_roles.BUILDER,1, 2, [WORK, CARRY, MOVE], 1));
    // Upgrader
    ll_creepDefinitions.push(fncCrtCreepDef._create(llc_roles.UPGRADER, llc_roles.UPGRADER,2, 4, [WORK, CARRY, MOVE], 0));
    // Builder
    ll_creepDefinitions.push(fncCrtCreepDef._create(llc_roles.BUILDER, llc_roles.BUILDER,3, 3, [WORK, WORK, CARRY, MOVE], 0));

    // TODO: Builder 2
    // adjustment to resource management
    // go for secondary structures
    // TODO: UPGRADER 2
    // adjustment to resource management
    // go for repair jobs

/////////////////////////////////// spawning creeps ////////////////////////////////////
    // Spawn creeps by definitions, prio ascending
    let lv_spawning = false;
    for (let lv_prio = 0; lv_prio < ll_creepDefinitions.length; lv_prio++) {
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
    // TODO: Adjust Creep work triggers according to primary and secondary roles
    // TODO: Adjust role checks so first primary then secondary roles are executed (checks should be extracted from main script)
    for (let lv_name in Game.creeps) {
        if (Game.creeps.hasOwnProperty(lv_name)) {
            let lv_creep = Game.creeps[lv_name];
            if (lv_creep.memory.role === 'harvester') {
                // TODO: Harvesters should build containers if every spawn is full
                let lv_resourceFull = false;

                ll_spawns.forEach(
                    spawn => lv_resourceFull = coreCheck._checkFreeCapacity(spawn, RESOURCE_ENERGY, 0)
                );

                if(lv_resourceFull){
                    roleBuilder.run(lv_creep, ll_spawns[0]);
                }else{
                    roleHarvester.run(lv_creep, lv_creep.resourceID);
                }
            }
            if (lv_creep.memory.role === 'upgrader') {
                roleUpgrader.run(lv_creep);
            }
            if (lv_creep.memory.role === 'builder') {
                roleBuilder.run(lv_creep, ll_spawns[0]);
            }
        }
    }
};