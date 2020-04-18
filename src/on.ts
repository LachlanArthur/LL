type ElementType =
  AudioScheduledSourceNode |
  AudioWorkletNode |
  ScriptProcessorNode |
  HTMLBodyElement |
  HTMLFrameSetElement |
  HTMLMarqueeElement |
  HTMLMediaElement |
  HTMLVideoElement |
  HTMLElement |
  Element |
  Document |
  OfflineAudioContext |
  BaseAudioContext |
  IDBOpenDBRequest |
  IDBRequest |
  SVGSVGElement |
  SVGElement |
  AbortSignal |
  Animation |
  ApplicationCache |
  AudioTrackList |
  BroadcastChannel |
  FileReader |
  IDBDatabase |
  IDBTransaction |
  MSInputMethodContext |
  MediaDevices |
  MediaQueryList |
  MediaStream |
  MediaStreamTrack |
  MessagePort |
  Notification |
  PaymentRequest |
  Performance |
  RTCDTMFSender |
  RTCDataChannel |
  RTCDtlsTransport |
  RTCDtmfSender |
  RTCIceGatherer |
  RTCIceTransport |
  RTCPeerConnection |
  RTCSrtpSdesTransport |
  ScreenOrientation |
  ServiceWorker |
  ServiceWorkerContainer |
  ServiceWorkerRegistration |
  SpeechRecognition |
  SpeechSynthesis |
  SpeechSynthesisUtterance |
  TextTrack |
  TextTrackCue |
  TextTrackList |
  VideoTrackList |
  WebSocket |
  Window |
  Worker |
  XMLHttpRequest |
  XMLHttpRequestEventTarget |
  EventTarget;

export interface DocumentEventMapExtra extends DocumentEventMap {
  'DOMContentLoaded': Event;
}

type UnknownEventMap = { [ eventName: string ]: Event };

export type EventMapFor<T extends EventTarget> =
  // Ensure these are sorted correctly

  T extends AudioNode ? (
    T extends AudioScheduledSourceNode ? AudioScheduledSourceNodeEventMap :
    T extends AudioWorkletNode ? AudioWorkletNodeEventMap :
    T extends ScriptProcessorNode ? ScriptProcessorNodeEventMap :
    UnknownEventMap
  ) :

  T extends Node ? (
    T extends Element ? (
      T extends HTMLElement ? (
        T extends HTMLBodyElement ? HTMLBodyElementEventMap :
        T extends HTMLFrameSetElement ? HTMLFrameSetElementEventMap :
        T extends HTMLMarqueeElement ? HTMLMarqueeElementEventMap :
        T extends HTMLMediaElement ? HTMLMediaElementEventMap :
        T extends HTMLVideoElement ? HTMLVideoElementEventMap :
        HTMLElementEventMap
      ) :
      ElementEventMap
    ) :
    T extends Document ? DocumentEventMapExtra :
    UnknownEventMap
  ) :

  T extends BaseAudioContext ? (
    T extends OfflineAudioContext ? OfflineAudioContextEventMap :
    BaseAudioContextEventMap
  ) :

  T extends IDBRequest ? (
    T extends IDBOpenDBRequest ? IDBOpenDBRequestEventMap :
    IDBRequestEventMap
  ) :

  T extends SVGElement ? (
    T extends SVGSVGElement ? SVGSVGElementEventMap :
    SVGElementEventMap
  ) :

  T extends AbortSignal ? AbortSignalEventMap :
  T extends Animation ? AnimationEventMap :
  T extends ApplicationCache ? ApplicationCacheEventMap :
  T extends AudioTrackList ? AudioTrackListEventMap :
  T extends BroadcastChannel ? BroadcastChannelEventMap :
  T extends FileReader ? FileReaderEventMap :
  T extends IDBDatabase ? IDBDatabaseEventMap :
  T extends IDBTransaction ? IDBTransactionEventMap :
  T extends MSInputMethodContext ? MSInputMethodContextEventMap :
  T extends MediaDevices ? MediaDevicesEventMap :
  T extends MediaQueryList ? MediaQueryListEventMap :
  T extends MediaStream ? MediaStreamEventMap :
  T extends MediaStreamTrack ? MediaStreamTrackEventMap :
  T extends MessagePort ? MessagePortEventMap :
  T extends Notification ? NotificationEventMap :
  T extends PaymentRequest ? PaymentRequestEventMap :
  T extends Performance ? PerformanceEventMap :
  T extends RTCDTMFSender ? RTCDTMFSenderEventMap :
  T extends RTCDataChannel ? RTCDataChannelEventMap :
  T extends RTCDtlsTransport ? RTCDtlsTransportEventMap :
  T extends RTCDtmfSender ? RTCDtmfSenderEventMap :
  T extends RTCIceGatherer ? RTCIceGathererEventMap : // extends RTCStatsProvider
  T extends RTCIceTransport ? RTCIceTransportEventMap :
  T extends RTCPeerConnection ? RTCPeerConnectionEventMap :
  T extends RTCSrtpSdesTransport ? RTCSrtpSdesTransportEventMap :
  T extends ScreenOrientation ? ScreenOrientationEventMap :
  T extends ServiceWorker ? ServiceWorkerEventMap :
  T extends ServiceWorkerContainer ? ServiceWorkerContainerEventMap :
  T extends ServiceWorkerRegistration ? ServiceWorkerRegistrationEventMap :
  T extends SpeechRecognition ? SpeechRecognitionEventMap :
  T extends SpeechSynthesis ? SpeechSynthesisEventMap :
  T extends SpeechSynthesisUtterance ? SpeechSynthesisUtteranceEventMap :
  T extends TextTrack ? TextTrackEventMap :
  T extends TextTrackCue ? TextTrackCueEventMap :
  T extends TextTrackList ? TextTrackListEventMap :
  T extends VideoTrackList ? VideoTrackListEventMap :
  T extends WebSocket ? WebSocketEventMap :
  T extends Window ? WindowEventMap :
  T extends Worker ? WorkerEventMap :
  T extends XMLHttpRequest ? XMLHttpRequestEventMap :
  T extends XMLHttpRequestEventTarget ? XMLHttpRequestEventTargetEventMap :
  UnknownEventMap;

type MaybeArray<T> = T | Array<T>;

function ensureArray<T>( maybe: MaybeArray<T> ): Array<T> {
  return Array.isArray( maybe ) ? maybe : [ maybe ];
}

export function on<
  tObj extends ElementType,
  tEventMap extends EventMapFor<tObj>,
  tEventName extends Extract<keyof tEventMap, string>
>(
  elements: MaybeArray<tObj | null>,
  events: MaybeArray<tEventName>,
  targetFilter?: string,
) {

  const elementsArray = ensureArray( elements )
    .filter( ( element ): element is tObj => element !== null && typeof element !== 'undefined' )
    // Ensure events can be attached to the elements
    .filter( element => 'addEventListener' in element );

  const eventsArray = ensureArray( events );

  return <tEvent extends tEventMap[ tEventName ]>(
    listeners: MaybeArray<( this: tObj, event: tEvent ) => void>,
    options?: boolean | AddEventListenerOptions,
  ) => {
    let listenersArray = ensureArray( listeners );

    if ( typeof targetFilter !== 'undefined' ) {
      listenersArray = listenersArray.map( ( f ) => function ( this: tObj, event: tEvent ) {
        const target = ( event as unknown as Event ).target;
        if ( target instanceof Element ) {
          const filteredTarget = target.closest( targetFilter );
          if ( filteredTarget ) f.call( filteredTarget as any, event );
        }
      } );
    }

    for ( let element of elementsArray ) {
      for ( let event of eventsArray ) {
        for ( let listener of listenersArray ) {
          element.addEventListener.call( element, event, listener as unknown as EventListener, options );
        }
      }
    }
  };
}
