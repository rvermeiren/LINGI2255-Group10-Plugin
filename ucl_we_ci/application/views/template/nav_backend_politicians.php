
<li <?php if($active=="overview"):?>class="active"<?php endif;?>>
    <a href="<?php echo base_url();?>administration/politicians/index">Overview</a>
</li>
<li <?php if($active=="add_new_politician"):?>class="active"<?php endif;?>>
    <a href="<?php echo base_url();?>administration/politicians/add_new_politician">Add new politician</a>
</li>
<li <?php if($active=="import_and_export_procedures"):?>class="active"<?php endif;?>>
    <a href="<?php echo base_url();?>administration/politicians/import_and_export_procedures">Import and export procedures</a>
</li>
<li <?php if($active=="changes_to_approve"):?>class="active"<?php endif;?>>
    <a href="<?php echo base_url();?>administration/politicians/changes_to_approve">Changes to approve</a>
</li>
<li <?php if($active=="logs_changes"):?>class="active"<?php endif;?>>
    <a href="<?php echo base_url();?>administration/politicians/logs_changes">Logs changes</a>
</li>
<li <?php if($active=="edit_text_email"):?>class="active"<?php endif;?>>
    <a href="<?php echo base_url();?>administration/politicians/edit_text_email">Edit text of e-mails (reminders)</a>
</li>
	
