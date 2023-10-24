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
        Schema::create('tbl_car_introductions', function (Blueprint $table) {
            $table->string('registry_date');
            $table->string('remittance_name');
            $table->string('loading_date');
            $table->unsignedBigInteger('loading_tonnage');
            $table->string('carrier_unit_usd');
            $table->unsignedBigInteger('carrier_total_usd');
            $table->string('carrier_unit_irr');
            $table->unsignedBigInteger('carrier_total_irr');
            $table->unsignedBigInteger('owner_total_usd');
            $table->unsignedBigInteger('owner_total_irr');
            $table->unsignedBigInteger('carrier_loading_commission');
            $table->unsignedBigInteger('forwarding_loading_commission');
            $table->string('unloading_date');
            $table->unsignedBigInteger('unloading_tonnage');
            $table->unsignedBigInteger('difference');
            $table->unsignedBigInteger('allowable_deficit');
            $table->unsignedBigInteger('deficit_or_surplus');
            $table->string('unloading_receipt');
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
        Schema::table('tbl_car_introductions', function (Blueprint $table) {
            $table->dropColumn('registry_date');
            $table->dropColumn('remittance_name');
            $table->dropColumn('loading_date');
            $table->dropColumn('loading_tonnage');
            $table->dropColumn('carrier_unit_usd');
            $table->dropColumn('carrier_total_usd');
            $table->dropColumn('carrier_unit_irr');
            $table->dropColumn('carrier_total_irr');
            $table->dropColumn('owner_total_usd');
            $table->dropColumn('owner_total_irr');
            $table->dropColumn('carrier_loading_commission');
            $table->dropColumn('forwarding_loading_commission');
        });
    }
};
