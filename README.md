# Convert SMS to audio files

In this example project, we will convert SMS to audio using the [sipgateio](https://github.com/sipgate-io/sipgateio-node) library and [gTTS](https://www.npmjs.com/package/gtts).

## What is sipgate.io?

[sipgate.io](https://www.sipgate.io/) is a collection of APIs, which enables sipgate's customers to build flexible integrations matching their individual needs.
Among other things, it provides interfaces for sending and receiving text messages or faxes, monitoring the call history, as well as initiating and manipulating calls.
In this tutorial, we will use sipgate.io's contact API to import contacts from your company's Microsoft Outlook address book.

## In this example

The script in this repository pulls all SMS in a specified date range from your history and converts them to single mp3 files.

To achieve this we use our sipgate.io node-library in combination with the google text-to-speech package.

**Prerequisite:** You need `npm` and Node.js installed on your machine. 

## Getting started

To be able to launch this example, navigate to a directory where you want the example service to be stored. In a terminal, you can clone this repository from GitHub and install all required dependencies using `npm install`.

```bash
git clone https://github.com/sipgate-io/io-labs-sms-to-speech.git
cd io-labs-sms-to-speech
npm install
```

## Execution

Make sure to set the credentials of your sipgate account (token and token ID. See [Personal Access Token documentation](https://www.sipgate.io/rest-api/authentication#personalAccessToken) on sipgate.io) either in a `.env` file or by providing them as temporary environment variables at program execution:

```bash
SIPGATE_TOKEN=<token> \
SIPGATE_TOKEN_ID=<tokenId> \
npm start
```

You should now be able to convert your SMS.

## Alternative text-to-speech packages

In this example, we used gTTS to convert our SMS, however you can choose and use any package you like. A short, non-exhaustive list of open source options:

- [eSpeak](http://espeak.sourceforge.net/)
- [Mozilla TTS](https://github.com/mozilla/TTS)
- [OpenSeq2Seq](https://github.com/NVIDIA/OpenSeq2Seq)