<?php
namespace App\Models;
use App\Traits\TenantScoped;
use Illuminate\Database\Eloquent\Model;
use App\Traits\CustomAttribute;
class Email extends Model {
    use CustomAttribute, TenantScoped;
    protected $fillable = ['subject', 'source', 'user_type', 'is_read', 'is_draft', 'from', 'to', 'cc', 'bcc', 'sender', 'unique_id', 'message_id', 'reply', 'user_id', 'person_id', 'lead_id', 'parent_id'];
    protected $casts = ['from' => 'array', 'to' => 'array', 'cc' => 'array', 'bcc' => 'array', 'sender' => 'array', 'is_read' => 'boolean', 'is_draft' => 'boolean'];
    protected $with = ['attribute_values', 'attachments'];
    public function user() { return $this->belongsTo(User::class); }
    public function person() { return $this->belongsTo(Person::class); }
    public function lead() { return $this->belongsTo(Lead::class); }
    public function attachments() { return $this->hasMany(EmailAttachment::class); }
    public function tags() { return $this->belongsToMany(Tag::class, 'email_tags'); }
}
