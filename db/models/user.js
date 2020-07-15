/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('company', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        uuid: {
            type: DataTypes.STRING(40),
            allowNull: true,
            unique: true
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        friendly_name: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        company_username: {
            type: DataTypes.STRING(255),
            allowNull: true,
            unique: true
        },
        company_url: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        logo_url: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        company_domain: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        is_onboard: {
            type: DataTypes.ENUM('NA', 'Y', 'N'),
            allowNull: true,
            defaultValue: 'NA'
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        details: {
            type: DataTypes.STRING(255),
            allowNull: true,
            defaultValue: ''
        },
        package_text: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        gstin: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: true
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: true
        },
        deleted_at: {
            type: DataTypes.DATE,
            allowNull: true
        },
        city: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        white_labeled: {
            type: DataTypes.INTEGER(1),
            allowNull: true,
            defaultValue: '0'
        },
        dashboard_url: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        on_board_changed_at: {
            type: DataTypes.DATE,
            allowNull: true
        },
        candidate_report_documents: {
            type: DataTypes.ENUM('external_links', 'internal_images'),
            allowNull: false,
            defaultValue: 'external_links'
        }
    }, {
        tableName: 'company',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        timestamps: true
    });
};
