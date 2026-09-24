function Task3() {
  return (
    <div className="h-full flex flex-col justify-around items-center p-8 bg-gray-100 sm: gap-15">
      <div className="flex flex-col items-center justify-center gap-5 max-w-112.5 mt-8">
        <h2 className="text-2xl text-red-700 sm:text-3xl">Reliable, efficient delivery</h2>
        <h2 className="text-2xl text-gray-800 font-bold sm:text-3xl">Powered by Technology</h2>
        <p className="text-sm text-gray-400 text-center">
          Our Artificial intelligence powered tools use millions of project data
          points to ensure that your project is successful
        </p>
      </div>
     <div className="grid md:grid-cols-3 sm:grid-cols-1 items-center gap-8">
            <div className="bg-white rounded-2xl min-h-[250px] max-w-[350px] flex flex-col justify-around p-8 gap-4 shadow-md border-t-4 border-t-cyan-500 s">
                <div className="text-lg font-medium">Supervisor</div>
                <div className="flex-1 flex flex-col justify-between">
                    <p classNameName="text-[14px] text-gray-400">
                        Monitors activity to identify project roadblocks
                    </p>
                    <img className="self-end h-12" src="../../public/icon-supervisor.svg" alt="supervisor icon"/>
                </div>
            </div>
            <div className="flex flex-col gap-8">
                <div className="bg-white rounded-2xl min-h-[250px] max-w-[350px] flex flex-col justify-around p-8 gap-4 shadow-md border-t-4 border-t-red-400">
                    <div className="text-lg font-medium">Team builder</div>
                    <div className="flex-1 flex flex-col justify-between">
                        <p classNameName="text-[14px] text-gray-400">
                            Scans our talent network to create the optimal team for your project
                        </p>
                        <img className="self-end h-12" src="../../public/icon-team-builder.svg" alt="team-builder icon"/>
                    </div>
                </div>
                <div className="bg-white rounded-2xl min-h-[250px] max-w-[350px] flex flex-col justify-around p-8 gap-4 shadow-md border-t-4 border-t-yellow-500">
                    <div className="text-lg font-medium">Karma</div>
                    <div className="flex-1 flex flex-col justify-between">
                        <p classNameName="text-[14px] text-gray-400">
                            Regularly evaluates our talent to ensure quality
                        </p>
                        <img className="self-end h-12" src="../../public/icon-karma.svg" alt="karma icon"/>
                    </div>
                </div>
            </div>
            <div className="bg-white rounded-2xl min-h-[250px] max-w-[350px] flex flex-col justify-around p-8 gap-4 shadow-md border-t-4 border-t-purple-400">
                <div className="text-lg font-medium">Calculator</div>
                <div className="flex-1 flex flex-col justify-between">
                    <p classNameName="text-[14px] text-gray-400">
                        Uses data from past projects to provide better delivery estimates
                    </p>
                    <img className="self-end h-12" src="../../public/icon-calculator.svg" alt="calculator icon"/>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Task3;
