<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'id_type', 'id_category', 'description', 'cost', 'price'];

    public function category()
    {
        return $this->hasOne(ProductCategory::class, 'id', 'id_category');
    }

    public function type()
    {
        return $this->hasOne(ProductType::class, 'id', 'id_type');
    }
}