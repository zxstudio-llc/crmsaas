<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class WebForm extends Model {
    protected $table = 'webforms';
    protected $fillable = ['form_id', 'title', 'submit_button_label', 'submit_success_action', 'submit_success_content', 'submit_success_url', 'create_lead'];
    public function attributes() { return $this->hasMany(WebFormAttribute::class, 'webform_id'); }
}
