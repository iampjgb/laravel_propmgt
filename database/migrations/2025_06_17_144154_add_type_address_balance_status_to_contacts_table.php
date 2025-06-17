<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('contacts', function (Blueprint $table) {
            // Distinguish customer vs tenant vs vendor etc.
            $table->string('type')->default('tenant')->after('contact_group_id');

            // Physical/mailing address
            $table->text('address')->nullable()->after('phone');

            // Outstanding balance for receivables
            $table->decimal('balance', 15, 2)->default(0)->after('address');

            // e.g. 'active' / 'inactive'
            $table->string('status')->default('active')->after('balance');
        });
    }

    public function down(): void
    {
        Schema::table('contacts', function (Blueprint $table) {
            $table->dropColumn(['type', 'address', 'balance', 'status']);
        });
    }
};
