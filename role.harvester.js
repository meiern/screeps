let roleHarvester = {
    /** @param {Creep} io_creep
     *  @param {int} iv_resourceID **/
    run: function(io_creep, iv_resourceID) {
	    if(io_creep.store.getFreeCapacity() > 0) {
            let sources = io_creep.room.find(FIND_SOURCES);
            if(iv_resourceID !== undefined){
                if(io_creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
                    io_creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }else{
                if(io_creep.harvest(io_creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE)) === ERR_NOT_IN_RANGE) {
                    io_creep.moveTo(io_creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE), {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
        }
        else {
            let targets = io_creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType === STRUCTURE_EXTENSION || structure.structureType === STRUCTURE_SPAWN) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
            });
            if(targets.length > 0) {
                if(io_creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    io_creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
	}
};

module.exports = roleHarvester;