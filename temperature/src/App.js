import React, { useEffect, useState, useRef  } from 'react';
import { Dialog } from '@headlessui/react'
import anime from 'animejs';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Footer from './components/Footer';

const navigation = [
  {name: 'Inicio', href: '/'},
  { name: 'Uso', href: '/documentation' },
  { name: 'Acerca de', href: '/about' },
  { name: 'Colaboradores', href: '/colaborators' },
  { name: 'Escuela', href: '/school' },
]

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const elementRef = useRef(null);
  const navRef = useRef(null);

  useEffect(() => {
      const element = elementRef.current;
      const nav = navRef.current;

      // Utiliza anime.js para animar el elemento
      anime({
          targets: element,
          translateY: [-100, 0],
          opacity: [0, 1],
          easing: 'easeOutExpo',
          duration: 5000
      });

      anime({
        targets: nav,
        translateX: [-100, 0],
        opacity: [0, 1],
        easing: 'easeOutExpo',
        duration: 1000
    });
  }, []);

  return (
    <div classNameName="App">

      <div className="bg-white">
        <header className="absolute inset-x-0 top-0 z-50">
          <nav ref={navRef} className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
            <div className="flex lg:flex-1">
              <a href="/" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                  className="h-8 w-auto"
                  src="https://firebasestorage.googleapis.com/v0/b/itemplore.appspot.com/o/iTemp.png?alt=media&token=4a2d8609-c409-48f4-af08-1e2e02a73d47"
                  alt=""
                />
              </a>
            </div>
            <div className="flex lg:hidden">
              <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="hidden lg:flex lg:gap-x-12">
              {navigation.map((item) => (
                <a key={item.name} href={item.href} className="text-sm font-semibold leading-6 text-gray-900">
                  {item.name}
                </a>
              ))}
            </div>
            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
              <a href="/temperature" className="text-sm font-semibold leading-6 text-gray-900">
                Temperatura <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </nav>
          <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
            <div className="fixed inset-0 z-50" />
            <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
              <div className="flex items-center justify-between">
                <a href="#" className="-m-1.5 p-1.5">
                  <span className="sr-only">Your Company</span>
                  <img
                    className="h-8 w-auto"
                    src="https://firebasestorage.googleapis.com/v0/b/itemplore.appspot.com/o/iTemp.png?alt=media&token=4a2d8609-c409-48f4-af08-1e2e02a73d47"
                    alt=""
                  />
                </a>
                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 text-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                  <div className="py-6">
                    <a
                      href="#"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      Ingresar
                    </a>
                  </div>
                </div>
              </div>
            </Dialog.Panel>
          </Dialog>
        </header>

        <div className="relative isolate px-6 pt-14 lg:px-8">
          <div
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#43da6e] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
            />
          </div>
          <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
            <div className="text-center">
              <h1 ref={elementRef} className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                IoT Proyect - Know your temperature
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
              Proyecto de IoT para monitorear la temperatura en ambientes cerrados usando Arduino, desarrollado para la materia de Arquitectura de Computadoras.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <a
                  href="/documentation"
                  className="rounded-md bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Empezar
                </a>
                <a href="https://github.com/eehcx/IoTTemperature" target='blank' className="text-sm font-semibold leading-6 text-gray-900">
                  Aprender más <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
          <div
            className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#43da6e] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
            />
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;
