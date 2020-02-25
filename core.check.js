let fncCrtCreepDef = {
    /** value=""*
     * @param {{}} iv_entity
     * @param {int} iv_freeCapacity
     * @param {string} iv_resource
     */
    _checkFreeCapacity: function(iv_entity, iv_resource, iv_freeCapacity) {
        return iv_entity.getFreeCapacity(iv_resource) >= iv_freeCapacity;
    }
};

module.exports = fncCrtCreepDef;