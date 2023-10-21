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
        Schema::create('tbl_tanks', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('tank_no');
            $table->string('psi_date');
            $table->string('test_validity_date');
            $table->string('capotage_date');
            $table->unsignedBigInteger('company_id');
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
        Schema::table('tbl_tanks', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });
    }
};
