<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('contacts', function (Blueprint $table) {
            $table->foreignId('contact_group_id')->nullable()->constrained('contact_groups')->nullOnDelete();
            $table->string('tin')->nullable();
            $table->boolean('vip')->default(false);
            $table->boolean('active')->default(true);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('contacts', function (Blueprint $table) {
            $table->dropForeign(['contact_group_id']);
            $table->dropColumn(['contact_group_id', 'tin', 'vip', 'active']);
        });
    }
};
