import asyncio
import websocket

connected = set()

async def echo(websocket, path):
    print("A client just connected")
    connected.add(websocket)
    try:
        async for message in websocket:
            print("Received a message from the client")
            # Handle the incoming video stream here. This example simply echoes it back.
            await asyncio.wait([ws.send(message) for ws in connected if ws != websocket])
    finally:
        connected.remove(websocket)

async def main():
    async with websockets.serve(echo, "localhost", 5678):
        await asyncio.Future()  # Run forever

if __name__ == "__main__":
    asyncio.run(main())
