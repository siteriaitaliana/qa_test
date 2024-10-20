import http from 'k6/http'
import { sleep, check } from 'k6'

const apiUrl = 'https://rickandmortyapi.com/api/character'

export let options = {
    thresholds: {
        http_req_duration: ['p(99)<1000']
    },
    discardResponseBodies: true,
    scenarios: {
        characters: {
            executor: 'constant-arrival-rate',
            // How long the test lasts
            duration: '10s',
            // How many iterations per timeUnit
            rate: 30,
            // Start `rate` iterations per second
            timeUnit: '1s',
            // Pre-allocate 2 VUs before starting the test
            preAllocatedVUs: 2,
            // Spin up a maximum of 50 VUs to sustain the defined
            // constant arrival rate.
            maxVUs: 50,
            gracefulStop: '0s'
        }
    }
}

export default function () {
    const res = http.get(apiUrl)
    check(res, {
        'is status 200': (r) => r.status === 200
    })
    sleep(0.3)
}
