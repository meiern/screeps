let fncCrtCreepDef = {
    /** value=""*
     * @param {string} iv_role
     * @param {string} iv_secondaryRole
     * @param {int} iv_prio
     * @param {int} iv_amount
     * @param {[]} il_body
     * @param {int} iv_resourceID
     */
    _create: function(iv_role, iv_secondaryRole, iv_prio, iv_amount, il_body, iv_resourceID) {
        return {
            role: iv_role,
            secondaryRole: iv_secondaryRole,
            prio: iv_prio,
            amount: iv_amount,
            body: il_body,
            resourceID: iv_resourceID
        };
    }
};

module.exports = fncCrtCreepDef;