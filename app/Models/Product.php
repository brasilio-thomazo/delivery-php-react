<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    public function category()
    {
        return $this->hasOne(ProductCategory::class, 'id_category', 'id');
    }

    public function type()
    {
        return $this->hasOne(ProductType::class, 'id_type', 'id');
    }
}
