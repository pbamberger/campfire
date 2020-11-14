---
layout: page
title: Notify
permalink: /notify
comments: false
---

### Subscribe

_These fields are all optional_


<div class="form-group"><label for="855473300">Given Name</label><input name="givenName" id="855473300" type="text" maxlength=50 class="form-control"/></div>

<div class="form-group"><label for="2122144929">Family Name</label><input name="familyName" id="2122144929" type="text" maxlength=50 class="form-control"/></div>

<div class="form-group"><label for="226531911">Email</label><input name="emailAddress" id="226531911" type="text" maxlength=100 class="form-control"/></div>

<div class="form-group"><label for="565532832">Mobile Number</label><input name="mobileNumber" id="565532832" type="text" maxlength=20 class="form-control"/></div>

<button onclick="subscribeUser();">subscribe to site updates</button>


<br />

<button onclick="enablePush();">Enable Push Notifications</button>

<button onclick="showNotification('Test Notification', 'This is a test!');">Test Message</button>

<script>
    function enablePush() {
        if ('serviceWorker' in navigator) {
            Notification.requestPermission(result =>  {
                console.log(result)
                if (result === 'granted') {
                    alert('pushed granted')
                }
                else {
                    alert('no pushes')
                }
            });
        }
        else {
            alert('no cookbook or pushes')
        }
    }

    function showNotification(title, message) {
        if (Notification.permission == 'granted') {
            navigator.serviceWorker.getRegistration().then(registration => {
                var options = {
                    body: 'notification body!',
                    icon: 'assets/images/scouts.webp',
                    vibrate: [100, 50, 100],
                    data: {
                        dateOfArrival: Date.now(),
                        primaryKey: 1
                    },
                    actions: [
                        {
                            action: 'aaa',
                            title: 'option A',
                            icon: 'assets/images/icon48.webp'
                        },
                        {
                            action: 'bbb',
                            title: 'option b',
                            icon: 'assets/images/rssfeed.webp'
                        },
                    ]
                };
                registration.showNotification(title, options);
            });
        }
    }

    function subscribeUser() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.ready.then(registration => {
                const subscribeOptions = {
                    userVisibleOnly: true,
                    applicationServerKey: urlBase64ToUint8Array('BFH3Ja47h5yvBm3es-0pUsmh96r1DDYKtx2vlbigTOUpXrinacZIeS9ZYw4DuMZCFjLWRbeTOQ-_1XhFg6wwBL8')
                };
                registration.pushManager.subscribe(subscribeOptions).then(subscription => {
                    const endpointUrl = subscription.endpoint;
                    const emailAddress = document.getElementById('226531911').value;
                    const mobileNumber = document.getElementById('565532832').value;
                    const givenName = document.getElementById('855473300').value;
                    const familyName = document.getElementById('2122144929').value;
                    console.log('Endpoint URL: ', subscription.endpoint);
                    const data = `entry.1775364902=${endpointUrl}&entry.226531911=${emailAddress}&entry.565532832=${mobileNumber}&entry.855473300=${givenName}&entry.2122144929=${familyName}&submit=Submit`;
                    const result = saveSubscription('1FAIpQLSfrpnyb-4yVPSTCfafM88g4g3dn1fv710VKm3575f3zBGH6GA', data);
                    if (result != 'OK') {
                        //alert(result);
                    }
                }).catch(e => {
                    if (Notification.permission === 'denied') {
                        console.warn('Permission for notifications was denied');
                    } else {
                        console.error('Unable to subscribe to push', e);
                    }
                });
            })
        }
    }

    function urlBase64ToUint8Array(base64String) {
        var padding = '='.repeat((4 - base64String.length % 4) % 4);
        var base64 = (base64String + padding)
            .replace(/\-/g, '+')
            .replace(/_/g, '/');
        var rawData = window.atob(base64);
        var outputArray = new Uint8Array(rawData.length);
        for (var i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    }

    async function saveSubscription(id, data) {
        var url = `https://docs.google.com/forms/d/e/${id}/formResponse?${data}`;
        await fetch(
            url,
            {
                method: 'GET',
                mode: 'no-cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                redirect: 'follow',
                referrerPolicy: 'no-referrer',
            }
        )
        .then(data => {
            console.log('Subscription Saved');
            return 'OK';
        })
        .catch(error => {
            console.error('Subscription Save Error:', error);
            return 'Error';
        });
    }
</script>
