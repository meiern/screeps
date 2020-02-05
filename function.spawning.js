let fncSpawn = {
    /** value=""*
     * @param {StructureSpawn} iv_spawn
     * @param {string} iv_creepRole
     * @param {object<string, [Creep]>} il_creeps
     */
    _spawn: function(iv_spawn, iv_creepRole, il_creeps) {
        if(iv_spawn){
            let creepCost = 0;
            let creepName = '';
            let creepNameCount = 0;

            // Define cost for creep
            creepCost += BODYPART_COST.carry;
            creepCost += BODYPART_COST.work;
            creepCost += BODYPART_COST.move;

            // Check for sufficient energy
            if(iv_spawn.store[RESOURCE_ENERGY] >= creepCost){
                // Define creep name
                creepName = iv_creepRole + creepNameCount;

                while (Game.creeps[creepName]) {
                    creepName = iv_creepRole + creepNameCount;
                    creepNameCount++;
                }

                // Spawn creep
                iv_spawn.spawnCreep([WORK, CARRY, MOVE], creepName, {
                    memory: {role: iv_creepRole}
                });

                // Add creep to creep group
                il_creeps[iv_creepRole].push(Game.creeps[creepName]);
            }
        }
    }
};

module.exports = fncSpawn;