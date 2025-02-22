import { Link } from "react-router";
import logo from "./assets/JD.svg";
import illustration from "./assets/3d-illustration.png";
import {
	Description,
	Dialog,
	DialogPanel,
	DialogTitle,
	Popover,
	PopoverBackdrop,
	PopoverButton,
	PopoverPanel,
} from "@headlessui/react";
import Nav from "./components/nav";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import Projects from "./components/projects";
import { IoLogoWhatsapp } from "react-icons/io";
import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
	"pdfjs-dist/build/pdf.worker.min.mjs",
	import.meta.url
).toString();

import { Document, Page } from "react-pdf";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import { ImSpinner9 } from "react-icons/im";

export default function App() {
	const [isOpen, setIsOpen] = useState(false);
	const [qrCodeURL, setQrCodeURL] = useState("");
	const [isResumeOpen, setIsResumeOpen] = useState(false);
	const [numPages, setNumPages] = useState<number>();
	const [pageNumber, setPageNumber] = useState<number>(1);
	const [scale, setScale] = useState<number>(1);

	useEffect(() => {
		const handleResize = () => {
			const width = window.innerWidth;
			const newScale = width > 768 ? 1 : width / 768;
			setScale(newScale);
		};

		window.addEventListener("resize", handleResize);
		handleResize();

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
		setNumPages(numPages);
	}

	const goToNextPage = () => {
		if (pageNumber < numPages!) {
			setPageNumber(pageNumber + 1);
		}
	};

	const goToPreviousPage = () => {
		if (pageNumber > 1) {
			setPageNumber(pageNumber - 1);
		}
	};

	const handleClick = () => {
		const whatsappLink = "https://wa.me/+2349014349835";

		QRCode.toDataURL(
			whatsappLink,
			{ errorCorrectionLevel: "H" },
			(err: any, url: string) => {
				if (err) return console.error(err);
				setQrCodeURL(url);
			}
		);

		setIsOpen(true);
	};

	return (
		<div className={`${(isOpen || isResumeOpen) && "blur-sm"}`}>
			<header className="p-4 bg-white shadow-gray-900 shadow-sm fixed left-0 right-0 z-50">
				<div className="lg:container mx-auto">
					<div className="flex items-center justify-between">
						<div className="flex shrink-0">
							<Link to="/" title="Go Home" className="flex">
								<img className="w-auto h-8" src={logo} alt="logo" />
							</Link>
						</div>

						<div className="flex md:hidden items-center justify-center">
							<Popover className="group">
								<PopoverButton className="focus:outline-none text-gray-900 text-2xl">
									<AiOutlineClose className="hidden group-data-[open]:block" />
									<AiOutlineMenu className="group-data-[open]:hidden" />
								</PopoverButton>
								<PopoverBackdrop
									transition
									className="fixed inset-0 bg-black/50 top-[64px] transition duration-300 ease-out data-[closed]:opacity-0"
								/>
								<PopoverPanel
									transition
									className="flex flex-col justify-between absolute transition duration-300 ease-in-out left-0 data-[closed]:-translate-x-[100%] h-[calc(100vh-64px)] top-[64px] bg-white w-4/5 min-[425px]:w-1/2 p-4"
								>
									{({ close }: { close: () => void }) => (
										<>
											<Nav close={close} />
											<div className="flex">
												<button
													onClick={() => setIsResumeOpen(true)}
													className="inline-flex items-center cursor-pointer justify-center px-6 py-2 sm:py-2.5 text-base font-semibold text-white transition-all duration-200 bg-gray-900 rounded-lg sm:text-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
												>
													VIEW RESUME
												</button>
											</div>
										</>
									)}
								</PopoverPanel>
							</Popover>
						</div>

						<div className="hidden md:flex">
							<Nav />
						</div>

						<div className="hidden md:flex">
							<button
								onClick={() => setIsResumeOpen(true)}
								className="inline-flex items-center cursor-pointer justify-center px-6 py-2 sm:py-2.5 text-base font-semibold text-white transition-all duration-200 bg-gray-900 rounded-lg sm:text-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
							>
								VIEW RESUME
							</button>
							<Dialog
								open={isResumeOpen}
								transition
								onClose={() => setIsResumeOpen(false)}
								className="relative z-50 transition duration-300 ease-out data-[closed]:opacity-0"
							>
								<div className="fixed inset-0 bg-black/50 p-4 flex justify-center">
									<DialogPanel className="h-full bg-white rounded scrollbar-hidden overflow-scroll flex flex-col justify-between items-center p-4 gap-3">
										<Document
											className="flex-grow w-full flex justify-center items-center"
											file="/Abdulbasit Yusuf's CV.pdf"
											onLoadSuccess={onDocumentLoadSuccess}
											loading={
												<ImSpinner9 className="animate-spin text-gray-900 text-5xl" />
											}
											error={<p>Failed to load</p>}
										>
											<Page pageNumber={pageNumber} scale={scale} />
										</Document>

										<div className="flex justify-evenly items-center gap-2">
											<button
												onClick={goToPreviousPage}
												disabled={pageNumber === 1}
												className="disabled:cursor-not-allowed inline-flex items-center justify-center px-6 py-2 sm:py-2.5 text-base font-semibold text-white transition-all duration-200 bg-gray-900 rounded-lg sm:text-sm hover:bg-gray-700 disabled:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
											>
												<GrLinkPrevious />
											</button>
											<button
												onClick={goToNextPage}
												disabled={pageNumber === numPages}
												className="disabled:cursor-not-allowed inline-flex items-center justify-center px-6 py-2 sm:py-2.5 text-base font-semibold text-white transition-all duration-200 bg-gray-900 rounded-lg sm:text-sm hover:bg-gray-700 disabled:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
											>
												<GrLinkNext />
											</button>
										</div>
									</DialogPanel>
								</div>
							</Dialog>
						</div>
					</div>
				</div>
			</header>

			<main>
				<section
					className="py-[112px] bg-gradient-to-b from-gray-50 via-white to-gray-50"
					id="about"
				>
					<div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
						<div className="grid max-w-md grid-cols-1 mx-auto md:grid-cols-12 gap-x-6 gap-y-8 md:max-w-none">
							<div className="self-center md:col-span-6">
								<h1 className="text-3xl font-bold text-gray-900 sm:text-4xl xl:text-5xl">
									Hey 👋 I am Abdulbasit Yusuf, Frontend Developer!
								</h1>
								<p className="mt-5 text-base font-normal leading-7 text-gray-500">
									A new day...another opportunity to become world class
								</p>

								<div className="relative inline-flex mt-9 space-x-2 text-xl">
									<Link
										to="https://github.com/Jideotetic"
										title="Github Profile"
									>
										<FaGithub />
									</Link>

									<Link
										to="https://www.linkedin.com/in/jideotetic/"
										title="LinkedIn Profile"
									>
										<FaLinkedin />
									</Link>
									<button
										onClick={handleClick}
										title="Connect on whatsapp"
										className="cursor-pointer"
									>
										<IoLogoWhatsapp />
									</button>
									<Dialog
										open={isOpen}
										transition
										onClose={() => setIsOpen(false)}
										className="relative z-50 transition duration-300 ease-out data-[closed]:opacity-0"
									>
										<div className="fixed inset-0 bg-black/50 flex w-screen items-center justify-center p-4">
											<DialogPanel className="max-w-lg space-y-4 border bg-white p-12 rounded">
												<DialogTitle className="font-bold">
													Scan QR code to connect with me on whatsapp
												</DialogTitle>
												<Description>
													<img
														src={qrCodeURL}
														alt="WhatsApp QR Code"
														className="mx-auto"
													/>
												</Description>
											</DialogPanel>
										</div>
									</Dialog>
								</div>
							</div>

							<div className="self-end md:col-span-6">
								<img
									className="w-full max-w-xs mx-auto"
									src={illustration}
									alt=""
								/>
							</div>
						</div>
					</div>
				</section>

				<section className="py-[112px] bg-white" id="latest-projects">
					<div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
						<div className="text-center">
							<h2 className="text-3xl font-bold leading-tight tracking-widest text-gray-900 sm:text-4xl xl:text-5xl font-pj">
								LATEST PROJECTS
							</h2>
						</div>

						<div className="grid grid-cols-1 mt-10 text-center sm:mt-16 sm:grid-cols-2 md:grid-cols-3 md:gap-0 xl:mt-24">
							<Projects />
						</div>
					</div>
				</section>
			</main>

			<footer className="py-[112px] pb-12 bg-gray-900 text-white" id="contact">
				<div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
					<div className="grid grid-cols-1 sm:grid-cols-4 gap-y-16 gap-x-12">
						<div className="sm:col-span-2">
							<form
								action="https://formspree.io/f/xqazqwdo"
								method="POST"
								className="mt-6"
							>
								<p>Shoot me a message for collaboration</p>
								<div className="mt-3">
									<label htmlFor="email">Email</label>
									<input
										type="email"
										name="email"
										id="email"
										placeholder="Enter your email"
										className="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
									/>
								</div>

								<div className="mt-3">
									<label htmlFor="message">Enter your message</label>
									<textarea
										name="message"
										id="message"
										rows={5}
										placeholder=" Enter your message"
										className="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
									></textarea>
								</div>

								<button
									type="submit"
									className="inline-flex items-center justify-center px-6 py-4 mt-3 font-semibold text-white transition-all duration-200 bg-blue-600 rounded-md hover:bg-blue-700 focus:bg-blue-700"
								>
									Send Message
								</button>
							</form>
						</div>
					</div>

					<hr className="mt-16 mb-10 border-gray-200" />

					<p className="text-sm text-center text-gray-600">
						© Copyright 2025, All Rights Reserved
					</p>
				</div>
			</footer>
		</div>
	);
}
