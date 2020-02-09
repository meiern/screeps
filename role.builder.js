let roleBuilder = {

    /** @param {Creep} io_creep
     *  @param {Spawn} io_spawn **/
    run: function(io_creep, io_spawn) {

        if(io_creep.memory.building && io_creep.store[RESOURCE_ENERGY] === 0) {
            io_creep.memory.building = false;
            io_creep.say('🔄 harvest');
        }
        if(!io_creep.memory.building && io_creep.store.getFreeCapacity() === 0) {
            io_creep.memory.building = true;
            io_creep.say('🚧 build');
        }

        if(io_creep.memory.building) {
            let targets = io_creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(io_creep.build(targets[0]) === ERR_NOT_IN_RANGE) {
                    io_creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
        else {
            let sources = io_creep.room.find(FIND_SOURCES);
            if(io_creep.withdraw(io_spawn, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                io_creep.moveTo(io_spawn, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    }
};

module.exports = roleBuilder;