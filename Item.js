frappe.ui.form.on("Item", {
    onload: function(frm) {
        // Set query for "custom_material_category" based on "item_group"
        frm.set_query("custom_material_category", function() {
            if (!frm.doc.item_group) {
                frappe.msgprint(__("Please select an Item Group first."));
                return;
            }
            return {
                filters: {
                    "item_group": frm.doc.item_group
                }
            };
        });

        // Set query for "custom_material_description" based on "custom_material_category"
        frm.set_query("custom_material_description", function() {
            if (!frm.doc.custom_material_category) {
                frappe.msgprint(__("Please select a Material Category first."));
                return;
            }
            return {
                filters: {
                    "material_category": frm.doc.custom_material_category
                }
            };
        });

        // Triggered when item_group is changed
        frm.fields_dict.item_group.$input.on("change", function() {
            frm.set_value("custom_material_category", "");
            frm.refresh_field("custom_material_category");
        });

        // Triggered when custom_material_category is changed
        frm.fields_dict.custom_material_category.$input.on("change", function() {
            frm.set_value("custom_material_description", "");
            frm.refresh_field("custom_material_description");
        });

        // Refresh fields dynamically when form loads
        frm.refresh_field("custom_material_category");
        frm.refresh_field("custom_material_description");
    },

    // When an Item Group is selected, reset dependent fields
    item_group: function(frm) {
        frm.set_value("custom_material_category", "");
        frm.set_value("custom_material_description", "");
        frm.refresh_field("custom_material_category");
        frm.refresh_field("custom_material_description");
    },

    // When Material Category is selected, reset Material Description
    custom_material_category: function(frm) {
        frm.set_value("custom_material_description", "");
        frm.refresh_field("custom_material_description");
    }
});

