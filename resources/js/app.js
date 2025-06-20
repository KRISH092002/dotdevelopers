import './bootstrap';
import jQuery from 'jquery';
window.$ = jQuery;


import React from 'react';
import { createRoot } from 'react-dom/client';
import { InertiaApp } from '@inertiajs/inertia-react';
import { Ziggy } from './ziggy'; // Make sure this path is correct



window.Ziggy = Ziggy;




const el = document.getElementById('app');

createRoot(el).render(
        <InertiaApp
            initialPage={JSON.parse(el.dataset.page)}
            resolveComponent={(name) => {
                try {

                    // Dynamically import the component based on the name, ensuring correct path
                    const component = import(`./components/${name}.jsx`);
                    return component.then((module) => {
                    const loader =  document.getElementById('loader');
                    if(loader) loader.remove();
                    return module.default });
                } catch (error) {
                    console.error(`Error loading component ${name}:`, error);
                    throw error;
                }
            }}
        />
);



