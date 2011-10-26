/*
 * Copyright 2007-2011 Charles du Jeu <contact (at) cdujeu.me>
 * This file is part of AjaXplorer.
 *
 * AjaXplorer is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * AjaXplorer is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with AjaXplorer.  If not, see <http://www.gnu.org/licenses/>.
 *
 * The latest code can be found at <http://www.ajaxplorer.info/>.
 *
 * This is the main configuration file for configuring the basic plugins the application
 * needs to run properly : an Authentication plugin, a Configuration plugin, and a Logger plugin.
 */
Class.create("NotifierFormEnricher", {

    initialize : function(){
        var pConfigs = ajaxplorer.getPluginConfigs('notify');
        if(pConfigs && pConfigs.get('current_user_email')){
            this.currentUserEmail = pConfigs.get('current_user_email');
        }
        document.observe("ajaxplorer:afterApply-share", function(){
            this.enrichShareFolderForm();
        }.bind(this));
    },

    enrichShareFolderForm : function(){
        if($("share_folder_form") && $("share_folder_form").down("fieldset#notification_fieldset")){
            $("share_folder_form").down("fieldset#notification_fieldset").remove();
        }
        var ajxpNode = ajaxplorer.getUserSelection().getUniqueNode();
        if(ajxpNode.getMetadata().get("ajxp_shared")) {
            return;
        }
        $("share_folder_form").insert({bottom:'<fieldset id="notification_fieldset">\
							<legend ajxp_message_id="357">Notification</legend>\
							<div ><input type="checkbox" id="share_notification_active" name="PLUGINS_DATA_SHARE_NOTIFICATION_ACTIVE"> Notify me when files are uploaded or downloaded in this repository</div>\
							<div class="SF_element">\
								<div class="SF_label" ajxp_message_id="359"> Target email(s): </div>\
								<input type="text" value="" name="PLUGINS_DATA_SHARE_NOTIFICATION_EMAIL" id="share_notification_email" class="SF_input" disabled/>\
							</div>\
						</fieldset>\
        '});
        $('share_notification_active').observe("click", function(){
            if($('share_notification_active').getValue()){
                $('share_notification_email').enable();
            }else{
                $('share_notification_email').disable();
            }
        });
        if(this.currentUserEmail) {
            $('share_notification_email').setValue(this.currentUserEmail);
        }
    }

});

if(!window.notifierTool){
    window.notifierTool = new NotifierFormEnricher();
}