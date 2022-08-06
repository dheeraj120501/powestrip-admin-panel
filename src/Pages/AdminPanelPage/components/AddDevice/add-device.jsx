import React from "react";

function AddDevice() {
  return (
    <div className="w-5/12">
      <div className="mb-8">
        <div className="font-bold text-xl">Add Powerstrip Edge Device</div>
        <div className="font-light text-base text-[color:var(--color-subtext)]">
          Add a device here before setting up at device location
        </div>
      </div>
      <form>
        <div className="mb-4">
          <label
            htmlFor="device_id"
            className="text-[color:var(--color-subtext)] block mb-1"
          >
            Device ID
          </label>
          <input
            type="text"
            id="device_id"
            placeholder="eg. - 12th6mo98ndge"
            className="p-3 rounded-lg w-full bg-[color:var(--color-bg-primary)] outline-none neumorphism-inner placeholder-[color:var(--color-placeholder)]"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="device_name"
            className="text-[color:var(--color-subtext)] block mb-1"
          >
            Device Name
          </label>
          <input
            type="text"
            id="device_name"
            placeholder="eg. - PS_TYU_4567JM"
            className="p-3 rounded-lg w-full bg-[color:var(--color-bg-primary)] outline-none neumorphism-inner placeholder-[color:var(--color-placeholder)]"
          />
        </div>
        <div className="mb-4">
          <div className="text-[color:var(--color-subtext)] block mb-1">
            Device Type
          </div>
          <div className="flex items-center justify-between mt-2">
            <label htmlFor="device_type_public" className="radio_container">
              <input type="radio" id="device_type_public" name="device_type" />
              <span className="checkmark"></span>
              Public
            </label>
            <label htmlFor="device_type_private" className="radio_container">
              <input type="radio" id="device_type_private" name="device_type" />
              <span className="checkmark"></span>
              Private
            </label>
            <label htmlFor="device_type_dealer" className="radio_container">
              <input type="radio" id="device_type_dealer" name="device_type" />
              <span className="checkmark"></span>
              Dealer
            </label>
            <label htmlFor="device_type_personal" className="radio_container">
              <input
                type="radio"
                id="device_type_personal"
                name="device_type"
              />
              <span className="checkmark"></span>
              Personal
            </label>
          </div>
        </div>
        <div className="mb-4">
          <div className="text-[color:var(--color-subtext)] block mb-1">
            Charging Vehicle Type
          </div>
          <div className="flex items-center mt-2">
            <label
              htmlFor="vehicle_type_two_wheeler"
              className="radio_container mr-4"
            >
              <input
                type="radio"
                id="vehicle_type_two_wheeler"
                name="vehicle_type"
              />
              <span className="checkmark"></span>
              Two-wheeler
            </label>
            <label
              htmlFor="vehicle_type_four_wheeler"
              className="radio_container"
            >
              <input
                type="radio"
                id="vehicle_type_four_wheeler"
                name="vehicle_type"
              />
              <span className="checkmark"></span>
              Four-wheeler
            </label>
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="site"
            className="text-[color:var(--color-subtext)] block mb-1"
          >
            Site
          </label>
          <input
            type="text"
            id="site"
            placeholder="Sector - 112B"
            className="p-3 rounded-lg w-full bg-[color:var(--color-bg-primary)] outline-none neumorphism-inner placeholder-[color:var(--color-placeholder)]"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="site_area"
            className="text-[color:var(--color-subtext)] block mb-1"
          >
            Site Area
          </label>
          <input
            type="text"
            id="site_area"
            placeholder="Site Area"
            className="p-3 rounded-lg w-full bg-[color:var(--color-bg-primary)] outline-none neumorphism-inner placeholder-[color:var(--color-placeholder)]"
          />
        </div>
        <div className="mb-12">
          <label
            htmlFor="location"
            className="text-[color:var(--color-subtext)] block mb-1"
          >
            Location
          </label>
          <input
            type="text"
            id="location"
            placeholder="Google Map Code"
            className="p-3 rounded-lg w-full bg-[color:var(--color-bg-primary)] outline-none neumorphism-inner placeholder-[color:var(--color-placeholder)]"
          />
        </div>

        <div className="flex justify-between">
          <div className="px-4 py-2 bg-[color:var(--color-btn)] text-black font-bold rounded-md cursor-pointer">
            Add new device
          </div>
          <div className="px-4 py-2 bg-[color:#5C5C5C] font-bold rounded-md cursor-pointer">
            Cancel
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddDevice;
