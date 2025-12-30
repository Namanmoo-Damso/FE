'use client';

import { useState } from 'react';
import {
  LiveKitRoom,
  RoomAudioRenderer,
  useParticipants,
  useTracks,
  VideoTrack,
  AudioTrack,
} from '@livekit/components-react';
import { Track } from 'livekit-client';

function UserView() {
  const participants = useParticipants();
  const tracks = useTracks([Track.Source.Microphone, Track.Source.Camera]);

  // AI 에이전트만 필터링 (호스트는 제외)
  const agentParticipants = participants.filter(
    p => p.identity.includes('agent') || p.identity.includes('AI'),
  );

  return (
    <div style={{ padding: '20px' }}>
      <h2>AI 상담원과 연결됨</h2>
      <p>연결된 AI 에이전트: {agentParticipants.length}명</p>

      {/* 내 비디오 (로컬 참가자) */}
      <div style={{ marginBottom: '20px' }}>
        <h3>내 화면</h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '10px',
          }}
        >
          {tracks
            .filter(trackRef => trackRef.participant.isLocal)
            .map(trackRef => (
              <div
                key={trackRef.publication.trackSid}
                style={{ position: 'relative' }}
              >
                {trackRef.source === Track.Source.Camera && (
                  <VideoTrack
                    trackRef={trackRef}
                    style={{ width: '100%', height: 'auto' }}
                  />
                )}
                {trackRef.source === Track.Source.Microphone && (
                  <AudioTrack trackRef={trackRef} />
                )}
              </div>
            ))}
        </div>
      </div>

      {/* AI 에이전트 비디오 */}
      {/* {agentParticipants.length === 0 ? (
        <p>AI 에이전트를 기다리는 중...</p>
      ) : (
        <div>
          <h3>AI 상담원</h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '10px',
            }}
          >
            {tracks
              .filter(trackRef =>
                agentParticipants.some(p => p.sid === trackRef.participant.sid),
              )
              .map(trackRef => (
                <div
                  key={trackRef.publication.trackSid}
                  style={{ position: 'relative' }}
                >
                  {trackRef.source === Track.Source.Camera && (
                    <VideoTrack
                      trackRef={trackRef}
                      style={{ width: '100%', height: 'auto' }}
                    />
                  )}
                  {trackRef.source === Track.Source.Microphone && (
                    <AudioTrack trackRef={trackRef} />
                  )}
                  <div style={{ marginTop: '5px' }}>
                    <strong>{trackRef.participant.identity}</strong>
                    {trackRef.participant.isSpeaking && (
                      <span> 🎤 말하는 중...</span>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      )} */}
    </div>
  );
}

export default function LiveKitUserPage() {
  const [token, setToken] = useState<string>('');
  const [url, setUrl] = useState<string>('');
  const [roomName, setRoomName] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [connected, setConnected] = useState(false);

  const connect = async () => {
    if (!userName || !roomName) {
      alert('이름과 방 이름을 입력해주세요');
      return;
    }

    try {
      // TODO: 추후 axios로 리팩토링
      const response = await fetch('/api/livekit/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          roomName: roomName,
          identity: userName,
          name: userName,
          role: 'viewer',
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      setToken(data.token);
      setUrl(data.livekitUrl);
      setConnected(true);
    } catch (e) {
      console.error(e);
      alert('토큰을 가져오는데 실패했습니다. 콘솔을 확인해주세요.');
    }
  };

  const onDisconnected = () => {
    setConnected(false);
    setToken('');
    console.log('방에서 나갔습니다');
  };

  const onError = (error: Error) => {
    console.error('에러 발생:', error);
  };

  return (
    <div data-lk-theme="default">
      <h1>LiveKit 사용자 (AI 에이전트 연결)</h1>

      {!connected ? (
        <div>
          <h2>AI 상담 방 참가하기</h2>
          <div>
            <label htmlFor="userName">이름:</label>
            <input
              id="userName"
              type="text"
              value={userName}
              onChange={e => setUserName(e.target.value)}
              placeholder="이름을 입력하세요"
            />
          </div>
          <div>
            <label htmlFor="roomName">방 이름:</label>
            <input
              id="roomName"
              type="text"
              value={roomName}
              onChange={e => setRoomName(e.target.value)}
              placeholder="방 이름을 입력하세요"
            />
          </div>
          <button onClick={connect}>AI 상담 시작하기</button>
        </div>
      ) : (
        <LiveKitRoom
          serverUrl={url}
          token={token}
          connect={true}
          onDisconnected={onDisconnected}
          onError={onError}
          audio={true}
          video={true}
        >
          <RoomAudioRenderer />
          <UserView />
        </LiveKitRoom>
      )}
    </div>
  );
}
