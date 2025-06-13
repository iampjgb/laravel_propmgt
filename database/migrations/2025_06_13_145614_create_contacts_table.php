<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('contacts', function (Blueprint $table) {
            $table->id();
            // foreign key back to properties
            $table->foreignId('property_id')
                  ->constrained()
                  ->cascadeOnDelete();
            $table->string('name');
            $table->string('email')->nullable()->unique();
            $table->string('phone')->nullable();
            $table->string('category');      // unit_owner, tenant, management, service_provider
            $table->string('service_type')->nullable(); // Security, Maintenance, Housekeeping
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('contacts');
    }
};
