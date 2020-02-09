let fncCrtCreepDef = {
    /** value=""*
     * @param {string} iv_role
     * @param {int} iv_prio
     * @param {int} iv_amount
     * @param {[]} il_body
     */
    _create: function(iv_role, iv_prio, iv_amount, il_body) {
        return {
            role: iv_role,
            prio: iv_prio,
            amount: iv_amount,
            body: il_body
        };
    }
};

module.exports = fncCrtCreepDef;