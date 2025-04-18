import React from 'react';

export default function MusicAndHobbies() {
  return (
    <div className="p-8 space-y-12">
      <section>
        <h1 className="text-4xl font-bold mb-4">Music & Hobbies</h1>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">🎧 Music for Media</h2>
        <p className="mb-4">
          I enjoy writing music for film, games, and other media. I lean into cinematic textures,
          ambient tones, and rhythmic builds that enhance storytelling.
        </p>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-medium">"Rupert'n'Riley"</h3>
            <iframe width="60%" height="120" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/257682151&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>
            <p className="text-sm text-gray-600 mt-1">Composed for a sci-fi short film, inspired by deep space isolation.</p>
          </div>
          <div>
            <h3 className="text-xl font-medium">"Low Light"</h3>
            <iframe width="60%" height="120" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/257682151&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>
            <p className="text-sm text-gray-600 mt-1">An ambient loop designed for background tension in puzzle games.</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">🪚 Woodworking</h2>
        <p className="mb-4">
          When I’m away from the screen, I like to build things with my hands — from custom desks to
          small cabinetry projects.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="rounded-xl overflow-hidden shadow-lg">
              <img
                src={`https://via.placeholder.com/600x400?text=Woodworking+Project+${i}`}
                alt={`Woodworking Project ${i}`}
                className="w-full h-auto"
              />
              <div className="p-4">
                <h4 className="text-lg font-medium">Project {i}</h4>
                <p className="text-sm text-gray-600">A brief description of what this project was and why it was fun to build.</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
