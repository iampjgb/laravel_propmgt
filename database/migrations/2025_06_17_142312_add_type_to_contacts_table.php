<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddTypeToContactsTable extends Migration
{
    public function up()
    {
        Schema::table('contacts', function (Blueprint $table) {
            // If you want a simple boolean:
            $table->boolean('is_customer')->default(false);
            
         
        });
    }

    public function down()
    {
        Schema::table('contacts', function (Blueprint $table) {
            // $table->dropColumn('is_customer');
            $table->dropColumn('type');
        });
    }
}
