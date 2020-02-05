let fncSpawn = {
    /** value=""*
     * @param {StructureSpawn} iv_spawn
     * @param {string} iv_creepRole
     * @param {object<string, [Creep]>} il_creeps
     */
    _spawn: function(iv_spawn, iv_creepRole, il_creeps) {
        if(iv_spawn){
            let lv_creepCost = 0;
            let lv_creepName = '';
            let lv_creepNameCount = 0;

            // Define cost for creep
            lv_creepCost += BODYPART_COST.carry;
            lv_creepCost += BODYPART_COST.work;
            lv_creepCost += BODYPART_COST.move;

            // Check for sufficient energy
            if(iv_spawn.store[RESOURCE_ENERGY] >= lv_creepCost){
                // Define creep name
                lv_creepName = iv_creepRole + lv_creepNameCount;

                while (Game.creeps[lv_creepName]) {
                    lv_creepName = iv_creepRole + lv_creepNameCount;
                    lv_creepNameCount++;
                }

                // Spawn creep
                iv_spawn.spawnCreep([WORK, CARRY, MOVE], lv_creepName, {
                    memory: {role: iv_creepRole}
                });

                // Add creep to creep group
                il_creeps[iv_creepRole].push(Game.creeps[lv_creepName]);
            }
        }
    }
};

module.exports = fncSpawn;