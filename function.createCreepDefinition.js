let fncCrtCreepDef = {
    /** value=""*
     * @param {string} iv_role
     * @param {int} iv_prio
     * @param {int} iv_amount
     */
    _create: function(iv_role, iv_prio, iv_amount) {
        return {
            role: iv_role,
            prio: iv_prio,
            amount: iv_amount
        };
    }
};

module.exports = fncCrtCreepDef;