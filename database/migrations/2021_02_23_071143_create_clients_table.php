<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateClientsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('clients', function (Blueprint $table) {
            $table->id();
            $table->string('name', 25);
            $table->string('phone', 20);
            $table->string('address');
            $table->unsignedInteger('addr_number');
            $table->string('addr_complement')->nullable();
            $table->string('email', 150)->nullable();
            $table->string('document', 25)->nullable();
            $table->string('password')->nullable();
            $table->timestamps();
            $table->unique(['name', 'phone']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('clients');
    }
}
