const mysqlpool = require('../../config/dbConfig')
const logger = require('../../logger/logger')

module.exports = {

    getModulewiseMenus: (id, callBack) => {
        mysqlpool.query(
            `SELECT 
            menu_name.menu_slno, 
            menu_name.menu_name, 
            menu_name.menu_module, 
            menu_name.menu_status, 
            user_group_rights.group_rights_slno, 
            user_group_rights.user_group_slno, 
            user_group_rights.module_slno, 
            user_group_rights.menu_slno, 
            user_group_rights.menu_view, 
            user_group_rights.menu_add, 
            user_group_rights.menu_edit
        FROM 
            menu_name
        LEFT JOIN 
            user_group_rights 
        ON 
            user_group_rights.module_slno = menu_name.menu_module
        WHERE 
            menu_name.menu_module = ? 
            AND menu_name.menu_status = 1`,
            [id],
            (error, results, fields) => {
                if (error) {
                    logger.error(error);
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    ModulewiseMenus: (id, callBack) => {
        mysqlpool.query(
            `
             SELECT  module_slno
             FROM medivault.module_grp_master
             WHERE module_grp_master.module_user_type=?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    logger.error(error);
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    validateGroupRights: (data, callBack) => {
        mysqlpool.query(
            `SELECT user_group_slno,
                module_slno,
                menu_slno,
                    group_rights_slno
                FROM user_group_rights 
                WHERE user_group_slno = ? AND module_slno =?`,
            [
                data.user_group_slno,
                data.module_slno,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }

                return callBack(null, results)
            }
        )
    },
    getMenuSlno: (data, callBack) => {
        mysqlpool.query(
            `SELECT menu_slno
            FROM menu_name 
            WHERE menu_module= ?`,
            [
                data.module_slno,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }

                return callBack(null, results)
            }
        )
    },

    insertGroupRight: (data, callBack) => { //Inser Group Rights
        mysqlpool.query(
            `INSERT INTO user_group_rights (
                user_group_slno,
                module_slno,
                menu_slno
            )
            VALUES ?`,
            [
                data
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }

                return callBack(null, results)
            }
        )
    },
    getGroupMenuRigths: (data, callBack) => {
        mysqlpool.query(
            `SELECT 
            user_group_rights.group_rights_slno,
            menu_name.menu_slno,
            menu_name.menu_module,
            menu_name.menu_name,
            user_group_rights.menu_view,
            user_group_rights.menu_add,
            user_group_rights.menu_edit
        FROM user_group_rights
        RIGHT JOIN menu_name ON menu_name.menu_slno = user_group_rights.menu_slno 
        WHERE menu_name.menu_module = ? AND user_group_slno = ?`,
            [
                data.module_slno,
                data.user_group_slno,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }

                return callBack(null, results)
            }
        )
    },
    updateGroupMenuRights: (data, callBack) => {
        mysqlpool.query(
            `UPDATE user_group_rights
                SET menu_view = ?
                WHERE group_rights_slno = ?`,
            [
                data.menu_view,
                data.group_rights_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }

                return callBack(null, results)
            }
        )
    },
    UserWiseSettingsRights: (id, callBack) => {
        mysqlpool.query(
            `
             Select group_rights_slno, user_group_slno, module_slno, user_group_rights.menu_slno, menu_view, menu_add, menu_edit,menu_name.menu_name
             from user_group_rights 
             left join menu_name on menu_name.menu_module=user_group_rights.module_slno and menu_name.menu_slno =user_group_rights.menu_slno
             where user_group_slno=? and menu_view=1`,
            [id],
            (error, results, fields) => {
                if (error) {
                    logger.error(error);
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
}


