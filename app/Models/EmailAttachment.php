<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class EmailAttachment extends Model {
    protected $fillable = ['name', 'path', 'size', 'content_type', 'content_id', 'email_id'];
    public function email() { return $this->belongsTo(Email::class); }
}
