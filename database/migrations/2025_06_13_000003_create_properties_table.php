<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('properties', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique();
            $table->string('name');
            $table->string('address1');
            $table->string('address2')->nullable();
            $table->string('city');
            $table->string('province');
            $table->string('country');
            $table->string('telephone')->nullable();
            $table->string('website')->nullable();
            $table->string('sec_no')->nullable();
            $table->string('hlurb_no')->nullable();
            $table->string('rdo')->nullable();
            $table->string('tin_no')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('properties');
    }
};