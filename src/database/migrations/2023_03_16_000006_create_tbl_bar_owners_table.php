<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tbl_bar_owners', function (Blueprint $table) {
            $table->id();
            $table->string('company_name');
            $table->string('name');
            $table->string('family');
            $table->string('mobile');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('tbl_bar_owners', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });
    }
};
